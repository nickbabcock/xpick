import { useDevicePixelRatio } from "@/hooks/useDevicePixelRatio";
import { useSelectedPixelDensity, useStoreActions } from "@/store";
import { useEffect } from "react";

export function ResultsTable() {
  const actions = useStoreActions();
  useEffect(() => {
    actions.recheckSelectedDensity();
  }, [actions]);

  const pixelRatio = useDevicePixelRatio();
  const selectedDensity = useSelectedPixelDensity();

  return (
    <table className="text-lg font-semibold">
      <tbody>
        <tr>
          <td>Device pixel ratio</td>
          <td className="pl-8 text-right">{pixelRatio.toFixed(2)}x</td>
        </tr>
        <tr>
          <td>Selected image pixel density</td>
          <td className="pl-8 text-right">{selectedDensity.toFixed(2)}x</td>
        </tr>
      </tbody>
    </table>
  );
}
