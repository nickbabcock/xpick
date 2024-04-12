"use client";
import { densityOptions, useStoreActions } from "@/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResultsTable } from "./ResultsTable";

let cacheBustingId = 0;

export function DensityImage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const dimParams = params
    .getAll("dims")
    .flatMap((x) => x.split(","))
    .map((x) => +x)
    .filter((x) => !Number.isNaN(x));
  const dims = dimParams.length == 0 ? [1.25, 2, 4] : dimParams;

  const actions = useStoreActions();

  const srcSets = dims.map(
    (x) => `./image?dim=${x}x&id=${cacheBustingId} ${x}x`,
  );
  const srcSet = `\n${srcSets.map((x) => `  ${x}`).join(",\n")}`;

  return (
    <>
      <div className="max-w-prose flex flex-col gap-2">
        <p>Choose the image pixel densities to test:</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {densityOptions.map((x) => (
            <label
              key={x}
              className="w-[85px] px-3 py-2 text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-colors flex items-center"
            >
              <input
                type="checkbox"
                checked={dims.includes(x)}
                onChange={() => {
                  cacheBustingId += 1;
                  if (dims.includes(x)) {
                    const newDims = dims.filter((d) => x != d).join(",");
                    router.push(pathname + "?dims=" + newDims);
                  } else {
                    const newDims = [...dims, x].sort().join(",");
                    router.push(pathname + "?dims=" + newDims);
                  }
                }}
                className="w-4 h-4"
              />
              <span className="w-2" />
              {x}x
            </label>
          ))}
        </div>
      </div>

      <ResultsTable />

      <img
        alt=""
        width="300"
        height="300"
        src="./image"
        onLoad={() => {
          actions.recheckSelectedDensity();
        }}
        srcSet={srcSet}
      />
    </>
  );
}
