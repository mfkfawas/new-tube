import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Image src='/logo.svg' height={50} width={50} alt="logo" />
    <Button>Hello World</Button>
    </>
  );
}
