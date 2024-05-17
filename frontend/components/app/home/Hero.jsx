import Image from "next/image.js";
export default function Hero() {
   return (
      <div className="pt-18">
         <Image
            src="/facturas.jpg"
            width={1920}
            height={1080}
            alt="Facturas"
         />
         <div className="h-800 w-1080 bg-white">
         <div className="text-black text-center">Hola como andan</div>
         </div>
      </div>
   );
}
