import { ResponsiveContainer, HeatMap } from 'recharts';
import { zcmColor } from '../math/zcm';

export default function Dashboard({ zcm }: { zcm: number[] }) {
  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">ZCM\u202fHeatmap &amp; \u03c6\u2011node\u202fHUD</h1>
      <ResponsiveContainer width="100%" height={240}>
        {/* simple 1\u2011D heatmap using recharts\u00a0Cell colouring */}
        <HeatMap
          data={zcm.map((v, i) => ({ day: i + 1, value: v }))}
          dataKey="value"
          cellStyle={d => ({ fill: zcmColor(d.value) })}
        />
      </ResponsiveContainer>
    </section>
  );
}
