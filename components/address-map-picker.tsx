"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { divIcon, type LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

type AddressSelection = {
  label: string;
  detail: string;
  lat: number;
  lng: number;
};

const initialPosition: LatLngTuple = [-6.205, 106.832];
const STORAGE_KEY = "batter-days-selected-address";

function MapClickHandler({ onPick }: { onPick: (position: LatLngTuple) => void }) {
  useMapEvents({
    click(event) {
      onPick([event.latlng.lat, event.latlng.lng]);
    }
  });

  return null;
}

function MapSync({ position }: { position: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [map, position]);

  return null;
}

function MapResize() {
  const map = useMap();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => window.cancelAnimationFrame(id);
  }, [map]);

  return null;
}

function formatApproximateAddress(lat: number, lng: number) {
  return `Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;
}

async function reverseGeocode(lat: number, lng: number) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Reverse geocoding failed");
  }

  return (await response.json()) as {
    display_name?: string;
    address?: {
      road?: string;
      neighbourhood?: string;
      suburb?: string;
      city?: string;
      town?: string;
      village?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
  };
}

export function AddressMapPicker() {
  const router = useRouter();
  const [position, setPosition] = useState<LatLngTuple>(initialPosition);
  const [detailAddress, setDetailAddress] = useState("");
  const [label, setLabel] = useState("Jl. Sultan Agung, RT 2/RW 10, Ps. Manggis, Setiabudi, Jakarta Selatan");
  const [isResolving, setIsResolving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markerIcon = useMemo(
    () =>
      divIcon({
        className: "",
        html: `
          <div style="
            width: 28px;
            height: 28px;
            border-radius: 999px 999px 999px 0;
            background: #6d3a17;
            border: 3px solid #fff7ef;
            transform: rotate(-45deg);
            box-shadow: 0 10px 22px rgba(109, 58, 23, 0.25);
          "></div>
        `,
        iconAnchor: [14, 28],
        iconSize: [28, 28]
      }),
    []
  );

  useEffect(() => {
    let isActive = true;
    const [lat, lng] = position;

    setIsResolving(true);
    setError(null);

    reverseGeocode(lat, lng)
      .then((data) => {
        if (!isActive) return;

        const resolvedLabel = data.display_name ?? formatApproximateAddress(lat, lng);
        const city = data.address?.city ?? data.address?.town ?? data.address?.village ?? data.address?.suburb ?? "";
        const road = data.address?.road ?? data.address?.neighbourhood ?? "";
        const postcode = data.address?.postcode ?? "";
        const detail = data.display_name ?? ([road, city, postcode].filter(Boolean).join(", ") || resolvedLabel);

        setLabel(resolvedLabel);
        setDetailAddress(detail);
      })
      .catch(() => {
        if (!isActive) return;
        setError("Alamat belum bisa diambil otomatis. Silakan isi manual.");
        setLabel(formatApproximateAddress(lat, lng));
      })
      .finally(() => {
        if (!isActive) return;
        setIsResolving(false);
      });

    return () => {
      isActive = false;
    };
  }, [position]);

  const handleConfirm = () => {
    const [lat, lng] = position;
    const payload: AddressSelection = {
      label,
      detail: detailAddress.trim(),
      lat,
      lng
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/account/addresses/new");
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser ini tidak mendukung current location.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
        setIsLocating(false);
      },
      () => {
        setError("Akses lokasi ditolak atau tidak tersedia.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-[#fff8f1] text-[#1e1b15] shadow-[0_0_0_1px_rgba(241,225,209,0.8)]">
      <div className="flex items-center gap-3 border-b border-[#efe2d4] bg-white px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/account/addresses/new">
          <span className="material-symbols-outlined text-[22px]">close</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">Choose Location</h1>
      </div>

      <div className="relative min-h-0 flex-1">
        <MapContainer center={position} className="absolute inset-0 z-0 h-full w-full" key={position.join(",")} scrollWheelZoom zoom={15}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={markerIcon} position={position} />
          <MapSync position={position} />
          <MapResize />
          <MapClickHandler onPick={setPosition} />
        </MapContainer>

        <button
          className="absolute right-4 top-4 z-[9999] inline-flex items-center gap-2 rounded-full border border-[#f1cc9a] bg-white px-3 py-2 text-sm font-medium text-[#a45c1f] shadow-[0_8px_24px_rgba(89,33,0,0.12)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ zIndex: 9999 }}
          disabled={isLocating}
          onClick={handleCurrentLocation}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">my_location</span>
          {isLocating ? "Locating..." : "Current Location"}
        </button>

        <div className="absolute bottom-20 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-[22px] border border-[#f1e1d1] bg-white px-4 py-3 shadow-[0_14px_40px_rgba(89,33,0,0.12)]">
          <p className="text-sm leading-6 text-[#1e1b15]">{label}</p>
          <p className="mt-1 text-xs text-[#f28b22]">{isResolving ? "Resolving address..." : "Tap the map to change the pin location"}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[40] border-t border-[#efe2d4] bg-white/95 px-4 py-4 backdrop-blur">
          {error ? <p className="mb-3 text-sm leading-6 text-[#ff4d4d]">{error}</p> : null}
          <button
            className="flex w-full items-center justify-center rounded-2xl bg-[#78350f] px-5 py-4 text-base font-semibold text-white shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isResolving}
            onClick={handleConfirm}
            type="button"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

export { STORAGE_KEY as SELECTED_ADDRESS_STORAGE_KEY };
