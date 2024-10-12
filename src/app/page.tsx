import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Suspense } from "react";
import { DensityImage } from "@/components/DensityImage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
      <div className="max-w-prose space-y-8">
        <div className="flex items-center">
          <h1 className="grow text-5xl font-extrabold">XPick</h1>
          <Link href="https://github.com/nickbabcock/xpick">
            <GithubIcon
              className="h-8 w-8 dark:fill-white"
              alt="XPick Github Repo"
            />
          </Link>
        </div>
        <p className="text-lg">
          To serve high resolution images to high resolution displays, HTML{" "}
          <code>
            <Link href="https://www.debugbear.com/blog/responsive-images#the-srcset-attribute">
              srcset
            </Link>
          </code>{" "}
          supports a pixel density descriptor, sometimes known as an "x"
          descriptor. When targeting a specific device, it can be hard to
          understand what image the device picks as the available pixel density
          descriptors change.
        </p>
        <p className="text-lg italic">Enter XPick.</p>
      </div>

      <Suspense>
        <DensityImage />
      </Suspense>

      <small className="max-w-prose">
        Interested in something even more useful than XPick? Checkout{" "}
        <Link href="https://xpipe.io/">XPipe</Link>, the new shell connection
        hub and remote file manager.
      </small>
    </main>
  );
}
