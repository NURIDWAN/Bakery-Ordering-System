"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SELECTED_ADDRESS_STORAGE_KEY } from "@/components/address-map-picker";

type StoredAddress = {
  label: string;
  detail: string;
  lat: number;
  lng: number;
};

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

function formatApproximateAddress(lat: number, lng: number) {
  return `Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;
}

export default function NewAddressPage() {
  const [selectedAddress, setSelectedAddress] = useState<StoredAddress | null>(null);
  const [addressLabel, setAddressLabel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(SELECTED_ADDRESS_STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as StoredAddress;
      setSelectedAddress(parsed);
      setAddressLabel(parsed.label);
      setAddressDetail(parsed.detail);
    } catch {
      window.localStorage.removeItem(SELECTED_ADDRESS_STORAGE_KEY);
    }
  }, []);

  const setSelectedLocation = (nextAddress: StoredAddress) => {
    setSelectedAddress(nextAddress);
    setAddressLabel(nextAddress.label);
    setAddressDetail(nextAddress.detail);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Browser ini tidak mendukung current location.");
      return;
    }

    setIsResolvingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const data = await reverseGeocode(lat, lng);
          const city = data.address?.city ?? data.address?.town ?? data.address?.village ?? data.address?.suburb ?? "";
          const road = data.address?.road ?? data.address?.neighbourhood ?? "";
          const postcode = data.address?.postcode ?? "";
          const label = data.display_name ?? formatApproximateAddress(lat, lng);
          const detail = data.display_name ?? ([road, city, postcode].filter(Boolean).join(", ") || label);

          setSelectedLocation({ label, detail, lat, lng });
          window.localStorage.setItem(
            SELECTED_ADDRESS_STORAGE_KEY,
            JSON.stringify({ label, detail, lat, lng })
          );
        } catch {
          const label = formatApproximateAddress(lat, lng);
          setSelectedLocation({ label, detail: label, lat, lng });
          window.localStorage.setItem(
            SELECTED_ADDRESS_STORAGE_KEY,
            JSON.stringify({ label, detail: label, lat, lng })
          );
          setLocationError("Lokasi terdeteksi, tetapi alamat detail belum bisa diambil otomatis.");
        } finally {
          setIsResolvingLocation(false);
        }
      },
      () => {
        setIsResolvingLocation(false);
        setLocationError("Akses lokasi ditolak atau tidak tersedia.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] text-[#1e1b15]">
      <header className="flex items-center gap-3 border-b border-[#efe2d4] px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/account/addresses">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">New Address</h1>
      </header>

      <form className="flex flex-1 flex-col gap-4 px-4 py-4">
        <label className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Address Label *</span>
          <input
            className="w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#c9c0b8]"
            onChange={(event) => setAddressLabel(event.target.value)}
            placeholder="e.g. Home, Office, Mom's House"
            type="text"
            value={addressLabel}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">First Name *</span>
            <input
              className="w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#c9c0b8]"
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First name"
              type="text"
              value={firstName}
            />
          </label>
          <label className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Last Name</span>
            <input
              className="w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#c9c0b8]"
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last name"
              type="text"
              value={lastName}
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Phone *</span>
          <input
            className="w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#c9c0b8]"
            onChange={(event) => setPhone(event.target.value)}
            placeholder="e.g. 08xxxxxxxxxx"
            type="tel"
            value={phone}
          />
        </label>

        <section className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Location</span>
          <p className="text-sm leading-6 text-[#f28b22]">Search for your address, use current location, or choose from map</p>
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#c97c34]">search</span>
            <input
              className="w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 pl-12 text-sm outline-none placeholder:text-[#c9c0b8]"
              placeholder="Search for address..."
              type="search"
              value={selectedAddress?.label ?? ""}
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#f1cc9a] bg-white px-4 py-4 text-sm font-medium text-[#a45c1f] shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isResolvingLocation}
              onClick={handleCurrentLocation}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
              {isResolvingLocation ? "Locating..." : "Current Location"}
            </button>
            <Link className="flex items-center justify-center gap-2 rounded-2xl border border-[#f1cc9a] bg-white px-4 py-4 text-sm font-medium text-[#a45c1f] shadow-sm transition active:scale-[0.99]" href="/account/addresses/choose-location">
              <span className="material-symbols-outlined text-[20px]">map</span>
              Choose from Map
            </Link>
          </div>
          {selectedAddress ? (
            <div className="rounded-2xl border border-[#f1e1d1] bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Selected Coordinates</p>
              <p className="mt-2 text-sm font-medium text-[#1e1b15]">
                {selectedAddress.lat.toFixed(5)}, {selectedAddress.lng.toFixed(5)}
              </p>
            </div>
          ) : null}
          {locationError ? <p className="text-sm leading-6 text-[#ff4d4d]">{locationError}</p> : null}
        </section>

        <label className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c97c34]">Address Details *</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 text-sm outline-none placeholder:text-[#c9c0b8]"
            onChange={(event) => setAddressDetail(event.target.value)}
            placeholder="Building name, floor, or unit number"
            value={addressDetail}
          />
          <p className="text-sm leading-6 text-[#f28b22]">Auto-filled from your selected location. You can edit to add more details like building name, floor, or unit number.</p>
        </label>

        <div className="pt-2">
          <button className="w-full rounded-2xl bg-[#c6b0a0] px-5 py-4 text-base font-semibold text-white shadow-sm" type="button">
            Save Address
          </button>
        </div>
      </form>
    </main>
  );
}
