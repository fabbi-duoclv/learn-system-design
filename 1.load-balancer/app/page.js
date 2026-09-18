const nodes = [
  {
    name: "Server 1",
    ip: "10.0.0.1",
    accent: "#11a36a",
    bg: "#e7f8ef"
  },
  {
    name: "Server 2",
    ip: "10.0.0.2",
    accent: "#2563eb",
    bg: "#e9f0ff"
  }
];

const steps = [
  "Client gọi http://localhost:8080",
  "Nginx load balancer nhận request",
  "Traffic được chia tới một backend đang sẵn sàng",
  "Backend trả HTML tĩnh đã được build từ Next.js"
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="title">
        <div className="heroCopy">
          <p className="eyebrow">Next.js static export</p>
          <h1 id="title">Demo Load Balancer</h1>
          <p className="lede">
            Một app Next.js tĩnh để minh họa cách Nginx phân phối request giữa
            nhiều backend. Build xong có thể serve như HTML/CSS/JS bình thường.
          </p>
          <div className="actions" aria-label="Lệnh chạy nhanh">
            <code>npm run dev</code>
            <code>npm run build</code>
          </div>
        </div>

        <div className="diagram" aria-label="Sơ đồ load balancer">
          <div className="client">Client</div>
          <div className="arrow" aria-hidden="true" />
          <div className="balancer">Nginx LB</div>
          <div className="fanout" aria-hidden="true" />
          <div className="nodes">
            {nodes.map((node) => (
              <article
                className="node"
                key={node.name}
                style={{ "--accent": node.accent, "--node-bg": node.bg }}
              >
                <span className="status" />
                <h2>{node.name}</h2>
                <p>{node.ip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content" aria-label="Luồng request">
        <div className="panel">
          <h2>Luồng xử lý</h2>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="panel tone">
          <h2>Static output</h2>
          <p>
            `next build` sẽ tạo thư mục <strong>out</strong>. Thư mục này có thể
            được mount vào Nginx, upload lên static hosting, hoặc copy vào từng
            backend trong demo.
          </p>
        </div>
      </section>
    </main>
  );
}
