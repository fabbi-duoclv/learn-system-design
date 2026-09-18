# Demo Load Balancer local (giống Figure 1-4)

Mô phỏng đúng sơ đồ: 1 load balancer (Nginx) đứng trước 2 "server" (cũng là Nginx, mỗi cái trả về 1 trang khác nhau để bạn thấy traffic được chia đều).

## App Next.js static

Repo này cũng có một app Next.js tĩnh ở thư mục gốc.

```bash
npm install
npm run dev
```

Mở `http://localhost:3000` để xem app khi phát triển.

Build static export:

```bash
npm run build
```

Sau khi build, Next.js sẽ xuất HTML/CSS/JS tĩnh vào thư mục `out/`. Bạn có thể serve thư mục này bằng Nginx, static hosting, hoặc copy vào backend trong demo load balancer.

## Cách chạy

Cần cài Docker + Docker Compose trước.

```bash
cd lb-demo
docker compose up
```

## Test round-robin

Mở terminal khác, gọi liên tục:

```bash
curl http://localhost:8080
curl http://localhost:8080
curl http://localhost:8080
curl http://localhost:8080
```

Bạn sẽ thấy kết quả xen kẽ giữa "SERVER 1" và "SERVER 2" — đó chính là load balancer đang phân phối traffic.

Hoặc mở trình duyệt vào `http://localhost:8080` và bấm F5 (refresh) nhiều lần, để ý cái nền đổi màu xanh lá / xanh dương xen kẽ.

## Thử các thuật toán khác

Mở file `nginx-lb.conf`, trong block `upstream backend`, bỏ comment 1 trong các dòng:

- `least_conn;` — ưu tiên server đang có ít kết nối nhất
- `ip_hash;` — sticky session, cùng 1 IP luôn vào cùng 1 server

Sau đó chạy lại: `docker compose restart loadbalancer`

## Dọn dẹp

```bash
docker compose down
```

## Nếu không muốn dùng Docker

Có thể cài trực tiếp trên máy:
- **Nginx**: `brew install nginx` (Mac) hoặc `apt install nginx` (Ubuntu), sửa `/etc/nginx/nginx.conf` thêm block `upstream`.
- **HAProxy**: `brew install haproxy`, cấu hình trong `haproxy.cfg`, mạnh hơn về tính năng LB thuần túy (health check, nhiều thuật toán cân bằng tải).
- **Traefik**: hợp nếu bạn muốn tự động phát hiện service qua Docker labels, không cần sửa config thủ công.
- **Envoy**: nếu muốn học kiểu load balancer dùng trong service mesh (phức tạp hơn, dùng nhiều ở microservices lớn).

Nếu code app riêng (Node.js/Python) thay vì Nginx làm backend, chỉ cần đổi các service `server1`, `server2` trong `docker-compose.yml` thành image app của bạn, giữ nguyên phần load balancer.
