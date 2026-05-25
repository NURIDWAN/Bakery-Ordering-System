import dynamic from "next/dynamic";

const AddressMapPicker = dynamic(
  () => import("@/components/address-map-picker").then((module) => module.AddressMapPicker),
  { ssr: false }
);

export default function ChooseLocationPage() {
  return <AddressMapPicker />;
}
