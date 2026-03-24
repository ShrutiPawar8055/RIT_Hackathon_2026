# LiveKit AWS EC2 Setup Guide

## 1. Launch EC2 Instance

### Instance Configuration:
- **AMI**: Ubuntu 22.04 LTS
- **Instance Type**: t3.medium or larger (2+ vCPUs, 4+ GB RAM)
- **Storage**: 20+ GB SSD
- **Security Groups**:
  - Inbound: HTTP (80), HTTPS (443), Custom TCP (7880-7882)
  - Outbound: All traffic

### Connect to EC2:
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## 2. Install Docker & Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker ubuntu
```

## 3. Set Up LiveKit with Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  livekit:
    image: livekit/livekit-server:latest
    restart: unless-stopped
    ports:
      - "7880:7880"  # WebSocket
      - "7881:7881"  # HTTP API
      - "7882:7882"  # TURN/STUN
    environment:
      - LIVEKIT_KEYS=${LIVEKIT_API_KEY}:${LIVEKIT_API_SECRET}
      - LIVEKIT_PORT=7880
      - LIVEKIT_BIND_ADDR=0.0.0.0
      - LIVEKIT_RTC_PORT=7882
      - LIVEKIT_RTC_UDP_RANGE=50000-60000
    volumes:
      - ./data:/data

  # Optional: Nginx reverse proxy for SSL
  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - livekit
```

## 4. Configure Environment Variables

Create `.env` file:
```bash
# Generate secure keys
LIVEKIT_API_KEY=your-api-key-here
LIVEKIT_API_SECRET=your-api-secret-here

# Generate with: openssl rand -hex 32
LIVEKIT_API_KEY=$(openssl rand -hex 16)
LIVEKIT_API_SECRET=$(openssl rand -hex 32)
```

## 5. Start LiveKit Server

```bash
# Start services
docker-compose up -d

# Check logs
docker-compose logs -f livekit
```

## 6. Configure DNS & SSL (Optional but Recommended)

### Using Nginx with Let's Encrypt:
1. Point your domain to EC2 public IP
2. Install certbot and get SSL certificates
3. Configure Nginx reverse proxy

## 7. Test LiveKit Server

```bash
# Check if server is running
curl http://localhost:7880/

# Should return: "OK"
```

## 8. Update Your Application

### Backend (.env):
```env
LIVEKIT_API_KEY=your-generated-api-key
LIVEKIT_API_SECRET=your-generated-api-secret
LIVEKIT_URL=wss://your-ec2-domain-or-ip:7880
```

### Frontend (.env.local):
```env
VITE_LIVEKIT_URL=wss://your-ec2-domain-or-ip:7880
```

## 9. Security Considerations

- Use security groups to restrict access
- Set up SSL/TLS encryption
- Regularly update LiveKit and Docker images
- Monitor server resources and logs
- Consider using AWS WAF for additional protection

## 10. Monitoring & Maintenance

- Set up CloudWatch monitoring
- Configure log rotation
- Regular backups of configuration
- Update LiveKit when new versions are released

## Troubleshooting

- Check Docker logs: `docker-compose logs livekit`
- Verify ports are open: `netstat -tuln | grep 788`
- Test WebSocket connection from browser console
- Check firewall and security group settings