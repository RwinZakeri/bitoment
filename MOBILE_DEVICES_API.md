# Mobile Devices API Usage Guide

This guide shows how to use the specialized mobile devices endpoint to get information about mobile devices that are currently logged in.

## API Endpoint

### Get Mobile Devices

**GET** `/api/profile/devices/mobile`

Retrieves only mobile devices that are currently active for the authenticated user.

**Authentication Required:** Yes (JWT token)

## Response Format

```json
{
  "success": true,
  "message": "Mobile devices retrieved successfully",
  "devices": [
    {
      "id": 1,
      "user_id": 123,
      "device_id": "device_abc123",
      "device_name": "Mobile (iOS - Safari)",
      "device_type": "Mobile",
      "operating_system": "iOS",
      "browser": "Safari",
      "browser_version": "16.0",
      "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)...",
      "ip_address": "192.168.1.100",
      "location": null,
      "is_active": true,
      "last_seen": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-15T09:00:00Z"
    },
    {
      "id": 2,
      "user_id": 123,
      "device_id": "device_def456",
      "device_name": "Mobile (Android - Chrome)",
      "device_type": "Mobile",
      "operating_system": "Android",
      "browser": "Chrome",
      "browser_version": "120.0",
      "user_agent": "Mozilla/5.0 (Linux; Android 13; SM-G991B)...",
      "ip_address": "192.168.1.101",
      "location": null,
      "is_active": true,
      "last_seen": "2024-01-15T09:45:00Z",
      "created_at": "2024-01-15T08:30:00Z"
    }
  ]
}
```

## Usage Examples

### 1. Basic JavaScript/TypeScript

```typescript
// Get mobile devices
const getMobileDevices = async () => {
  const response = await fetch("/api/profile/devices/mobile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// Usage
const mobileDevices = await getMobileDevices();
console.log("Mobile devices:", mobileDevices.devices);
```

### 2. React Query Integration

```typescript
import { useQuery } from "@tanstack/react-query";
import ReactQueryKey from "@/types/react_query_key";

// Hook for mobile devices
const useMobileDevices = () => {
  return useQuery({
    queryKey: [ReactQueryKey.mobileDevices],
    queryFn: async () => {
      const response = await fetch("/api/profile/devices/mobile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });
};

// Usage in component
const MobileDevicesList = () => {
  const { data, isLoading, error } = useMobileDevices();

  if (isLoading) return <div>Loading mobile devices...</div>;
  if (error) return <div>Error loading devices</div>;

  return (
    <div>
      <h2>Your Mobile Devices</h2>
      {data?.devices?.map((device) => (
        <div key={device.id} className="device-card">
          <h3>{device.device_name}</h3>
          <p>OS: {device.operating_system}</p>
          <p>
            Browser: {device.browser} {device.browser_version}
          </p>
          <p>Last seen: {new Date(device.last_seen).toLocaleString()}</p>
          <p>IP: {device.ip_address}</p>
        </div>
      ))}
    </div>
  );
};
```

### 3. React Component with Device Management

```typescript
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MobileDeviceManager = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Get mobile devices
  const { data: mobileDevices, isLoading } = useQuery({
    queryKey: [ReactQueryKey.mobileDevices],
    queryFn: getMobileDevices,
  });

  // Update device name mutation
  const updateDeviceMutation = useMutation({
    mutationFn: async ({
      deviceId,
      deviceName,
    }: {
      deviceId: string;
      deviceName: string;
    }) => {
      const response = await fetch("/api/profile/devices", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_id: deviceId,
          device_name: deviceName,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.mobileDevices],
      });
    },
  });

  // Delete device mutation
  const deleteDeviceMutation = useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await fetch("/api/profile/devices", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_id: deviceId }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.mobileDevices],
      });
    },
  });

  const handleRenameDevice = (deviceId: string, newName: string) => {
    updateDeviceMutation.mutate({ deviceId, deviceName: newName });
  };

  const handleDeleteDevice = (deviceId: string) => {
    if (confirm("Are you sure you want to remove this device?")) {
      deleteDeviceMutation.mutate(deviceId);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mobile-devices-container">
      <h2>Mobile Devices ({mobileDevices?.devices?.length || 0})</h2>

      {mobileDevices?.devices?.map((device) => (
        <div key={device.id} className="device-item">
          <div className="device-info">
            <h3>{device.device_name}</h3>
            <div className="device-details">
              <span className="os-badge">{device.operating_system}</span>
              <span className="browser-badge">
                {device.browser} {device.browser_version}
              </span>
            </div>
            <p className="last-seen">
              Last seen: {new Date(device.last_seen).toLocaleString()}
            </p>
            <p className="ip-address">IP: {device.ip_address}</p>
          </div>

          <div className="device-actions">
            <button
              onClick={() => setSelectedDevice(device.device_id)}
              className="btn-rename"
            >
              Rename
            </button>
            <button
              onClick={() => handleDeleteDevice(device.device_id)}
              className="btn-delete"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {selectedDevice && (
        <RenameDeviceModal
          deviceId={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onRename={handleRenameDevice}
        />
      )}
    </div>
  );
};
```

### 4. Security Dashboard Example

```typescript
const SecurityDashboard = () => {
  const { data: mobileDevices } = useMobileDevices();
  const { data: allDevices } = useQuery({
    queryKey: [ReactQueryKey.devices],
    queryFn: getAllDevices,
  });

  const mobileCount = mobileDevices?.devices?.length || 0;
  const totalCount = allDevices?.devices?.length || 0;
  const desktopCount = totalCount - mobileCount;

  return (
    <div className="security-dashboard">
      <div className="device-stats">
        <div className="stat-card">
          <h3>Mobile Devices</h3>
          <span className="count">{mobileCount}</span>
        </div>
        <div className="stat-card">
          <h3>Desktop Devices</h3>
          <span className="count">{desktopCount}</span>
        </div>
        <div className="stat-card">
          <h3>Total Devices</h3>
          <span className="count">{totalCount}</span>
        </div>
      </div>

      <div className="recent-mobile-activity">
        <h3>Recent Mobile Activity</h3>
        {mobileDevices?.devices?.slice(0, 3).map((device) => (
          <div key={device.id} className="activity-item">
            <span className="device-name">{device.device_name}</span>
            <span className="last-seen">
              {new Date(device.last_seen).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Available Endpoints

| Endpoint                           | Description          |
| ---------------------------------- | -------------------- |
| `GET /api/profile/devices`         | All devices          |
| `GET /api/profile/devices/mobile`  | Only mobile devices  |
| `GET /api/profile/devices/active`  | Only active devices  |
| `GET /api/profile/devices/desktop` | Only desktop devices |

## Use Cases

1. **Mobile-First Dashboard**: Show only mobile devices in a mobile app
2. **Security Monitoring**: Track mobile device access patterns
3. **Device Management**: Allow users to manage their mobile devices separately
4. **Analytics**: Understand mobile vs desktop usage patterns
5. **Push Notifications**: Target mobile devices for notifications

## Error Handling

```typescript
const handleMobileDevices = async () => {
  try {
    const response = await fetch("/api/profile/devices/mobile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.devices;
  } catch (error) {
    console.error("Error fetching mobile devices:", error);
    // Handle error appropriately
  }
};
```

This mobile devices endpoint gives you focused access to mobile device information, making it perfect for mobile-specific features and security monitoring!
