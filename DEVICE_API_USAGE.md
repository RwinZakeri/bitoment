# Device Information API Usage Guide

This guide explains how to use the device information API endpoints in your application.

## API Endpoints

### Base URL

```
/api/profile/devices
```

## Authentication

All endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All User Devices

**GET** `/api/profile/devices`

Retrieves all devices associated with the authenticated user.

**Response:**

```json
{
  "success": true,
  "message": "Devices retrieved successfully",
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
    }
  ]
}
```

### 2. Register/Update Device

**POST** `/api/profile/devices`

Automatically registers a new device or updates the last_seen timestamp for existing devices. Device information is extracted from the request headers.

**Response:**

```json
{
  "success": true,
  "message": "Device registered successfully",
  "device": {
    "id": 1,
    "user_id": 123,
    "device_id": "device_abc123",
    "device_name": "Desktop (Windows - Chrome)",
    "device_type": "Desktop",
    "operating_system": "Windows",
    "browser": "Chrome",
    "browser_version": "120.0",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
    "ip_address": "192.168.1.100",
    "location": null,
    "is_active": true,
    "last_seen": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-15T09:00:00Z"
  }
}
```

### 3. Update Device Information

**PUT** `/api/profile/devices`

Updates specific device information.

**Request Body:**

```json
{
  "device_id": "device_abc123",
  "device_name": "My iPhone",
  "is_active": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Device updated successfully",
  "device": {
    "id": 1,
    "user_id": 123,
    "device_id": "device_abc123",
    "device_name": "My iPhone",
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
  }
}
```

### 4. Delete Device

**DELETE** `/api/profile/devices`

Removes a device from the user's account.

**Request Body:**

```json
{
  "device_id": "device_abc123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

## Usage Examples

### JavaScript/TypeScript

```typescript
// Get all devices
const getDevices = async () => {
  const response = await fetch("/api/profile/devices", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// Register/update current device
const registerDevice = async () => {
  const response = await fetch("/api/profile/devices", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// Update device name
const updateDevice = async (deviceId: string, deviceName: string) => {
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
  return await response.json();
};

// Delete device
const deleteDevice = async (deviceId: string) => {
  const response = await fetch("/api/profile/devices", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_id: deviceId,
    }),
  });
  return await response.json();
};
```

### React Query Integration

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQueryKey from "@/types/react_query_key";

// Get devices query
const useDevices = () => {
  return useQuery({
    queryKey: [ReactQueryKey.devices],
    queryFn: getDevices,
  });
};

// Register device mutation
const useRegisterDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.devices] });
    },
  });
};

// Update device mutation
const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      deviceId,
      deviceName,
    }: {
      deviceId: string;
      deviceName: string;
    }) => updateDevice(deviceId, deviceName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.devices] });
    },
  });
};

// Delete device mutation
const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => deleteDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKey.devices] });
    },
  });
};
```

## Device Information Detection

The API automatically detects the following information from request headers:

- **Device Type**: Mobile, Tablet, Desktop
- **Operating System**: Windows, macOS, Linux, iOS, Android
- **Browser**: Chrome, Firefox, Safari, Edge
- **Browser Version**: Extracted from user agent
- **IP Address**: From various headers (x-forwarded-for, x-real-ip, cf-connecting-ip)
- **User Agent**: Complete user agent string

## Security Features

- **Authentication Required**: All endpoints require valid JWT token
- **User Isolation**: Users can only access their own devices
- **Device ID Generation**: Unique device IDs based on user agent and IP
- **Last Seen Tracking**: Automatic timestamp updates for device activity

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
