'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Environment {
    id: string;
    name: string;
    description?: string;
}

interface EnvironmentsContextType {
    environments: Environment[];
    addEnvironment: (env: Omit<Environment, "id">) => void;
    removeEnvironment: (id: string) => void;
    updateEnvironment: (id: string, data: Partial<Environment>) => void;
    getEnvironment: (id: string) => Environment | undefined;
}

const EnvironmentsContext = createContext<EnvironmentsContextType | undefined>(undefined);

const INITIAL_ENVIRONMENTS: Environment[] = [
    { id: "env-1", name: "Galpão A", description: "Área de armazenamento principal" },
    { id: "env-2", name: "Escritório", description: "Área administrativa" },
    { id: "env-3", name: "Produção", description: "Linha de montagem" },
];

export function EnvironmentsProvider({ children }: { children: ReactNode }) {
    const [environments, setEnvironments] = useState<Environment[]>(INITIAL_ENVIRONMENTS);

    const addEnvironment = (newEnvData: Omit<Environment, "id">) => {
        const newEnv: Environment = {
            ...newEnvData,
            id: `env-${Date.now()}`,
        };
        setEnvironments((prev) => [...prev, newEnv]);
    };

    const removeEnvironment = (id: string) => {
        setEnvironments((prev) => prev.filter((env) => env.id !== id));
    };

    const updateEnvironment = (id: string, data: Partial<Environment>) => {
        setEnvironments((prev) =>
            prev.map((env) => (env.id === id ? { ...env, ...data } : env))
        );
    };

    const getEnvironment = (id: string) => {
        return environments.find((e) => e.id === id);
    };

    return (
        <EnvironmentsContext.Provider value={{ environments, addEnvironment, removeEnvironment, updateEnvironment, getEnvironment }}>
            {children}
        </EnvironmentsContext.Provider>
    );
}

export function useEnvironments() {
    const context = useContext(EnvironmentsContext);
    if (context === undefined) {
        throw new Error("useEnvironments must be used within a EnvironmentsProvider");
    }
    return context;
}
