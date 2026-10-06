import { TriangleDown, TriangleUp } from "@/components/ui/icons";
import { Section, SectionIntro } from "@/components/ui/section";
import { formatKpi, kpiNote, operatingFigures, variation } from "@/lib/kpis";

export function OperatingFigures() {
  return (
    <Section tone="petrol" labelledBy="cifras-titulo">
      <div className="grid gap-10 laptop:grid-cols-[1fr_1.7fr] laptop:gap-20">
        <SectionIntro
          id="cifras-titulo"
          title="La operación en cifras"
          lede="Indicadores de 2025 comparados con el año anterior. Se publican con la misma metodología que los informes de resultados."
        />

        <div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Indicadores operativos de 2025 y 2024, con su variación</caption>
            <thead>
              <tr className="border-b border-white/30 text-label text-petrol-100">
                <th scope="col" className="py-3 pr-4 font-medium">Indicador</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">2025</th>
                <th scope="col" className="hidden py-3 pr-4 text-right font-medium tablet:table-cell">2024</th>
                <th scope="col" className="py-3 text-right font-medium">Variación</th>
              </tr>
            </thead>
            <tbody>
              {operatingFigures.map((kpi) => {
                const change = variation(kpi);
                return (
                  <tr key={kpi.label} className="border-b border-white/15 align-baseline">
                    <th scope="row" className="py-5 pr-4 font-normal">
                      <span className="block text-base font-medium text-white">{kpi.label}</span>
                      <span className="block text-label text-petrol-100">{kpi.unit}</span>
                    </th>
                    <td className="num py-5 pr-4 text-right text-h3 font-semibold [font-stretch:108%] text-white">
                      {formatKpi(kpi.current, kpi.digits)}
                    </td>
                    <td className="num hidden py-5 pr-4 text-right text-ink-300 tablet:table-cell">
                      {formatKpi(kpi.previous, kpi.digits)}
                    </td>
                    <td className="num py-5 text-right text-[0.9375rem] font-medium">
                      <span className="inline-flex items-center justify-end gap-1.5 text-white">
                        {change.text.startsWith("−") ? <TriangleDown /> : <TriangleUp />}
                        {change.text}
                        <span className="sr-only">{change.improved ? ", mejora" : ", desmejora"}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-label text-petrol-100">{kpiNote}</p>
        </div>
      </div>
    </Section>
  );
}
