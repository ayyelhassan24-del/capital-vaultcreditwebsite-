const stats = [
  { value: "247+", label: "Success Stories" },
  { value: "$7.8M+", label: "in Funding Secured" },
  { value: "247+", label: "Businesses Transformed" },
  { value: "4.9/5", label: "Client Satisfaction" },
];

export default function StatsBar() {
  return (
    <section className="bg-vault-gold/10 border-y border-hairline py-12">
      <div className="container-vault">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-vault-gold">
                {stat.value}
              </p>
              <p className="text-vault-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
