"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type DeviceType = "ESP32" | "Sensor" | "Atuador" | "Outro";

export interface Device {
    id: string;
    name: string;
    type: DeviceType;
    macAddress?: string;
    status: "online" | "offline";
    isActive: boolean;
    location?: string;
    lastSeen?: string;
}

interface DevicesContextType {
    devices: Device[];
    addDevice: (device: Omit<Device, "id" | "status" | "isActive">) => void;
    removeDevice: (id: string) => void;
    toggleDevice: (id: string) => void;
    getDevice: (id: string) => Device | undefined;
}

const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

const INITIAL_DEVICES: Device[] = [
    {
        id: "1",
        name: "Sensor de Temperatura - Galpão A",
        type: "Sensor",
        macAddress: "00:1B:44:11:3A:B7",
        status: "online",
        isActive: true,
        location: "Galpão A",
        lastSeen: "2 min atrás",
    },
    {
        id: "2",
        name: "Controlador de Luzes",
        type: "ESP32",
        macAddress: "A2:33:11:FF:AA:BB",
        status: "offline",
        isActive: false,
        location: "Escritório",
        lastSeen: "1 hora atrás",
    },
    {
        id: "3",
        name: "Esteira Principal",
        type: "Atuador",
        macAddress: "CC:22:DD:EE:11:00",
        status: "online",
        isActive: true,
        location: "Produção",
        lastSeen: "Agora",
    },
];

export function DevicesProvider({ children }: { children: ReactNode }) {
    const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);

    const addDevice = (newDeviceData: Omit<Device, "id" | "status" | "isActive">) => {
        const newDevice: Device = {
            ...newDeviceData,
            id: Math.random().toString(36).substr(2, 9),
            status: "offline", // Default status for new devices
            isActive: false, // Default state
            lastSeen: "Nunca",
        };
        setDevices((prev) => [...prev, newDevice]);
    };

    const removeDevice = (id: string) => {
        setDevices((prev) => prev.filter((device) => device.id !== id));
    };

    const toggleDevice = (id: string) => {
        setDevices((prev) =>
            prev.map((device) =>
                device.id === id ? { ...device, isActive: !device.isActive } : device
            )
        );
    };

    const getDevice = (id: string) => {
        return devices.find((d) => d.id === id);
    };

    return (
        <DevicesContext.Provider value={{ devices, addDevice, removeDevice, toggleDevice, getDevice }}>
            {children}
        </DevicesContext.Provider>
    );
}

export function useDevices() {
    const context = useContext(DevicesContext);
    if (context === undefined) {
        throw new Error("useDevices must be used within a DevicesProvider");
    }
    return context;
}
