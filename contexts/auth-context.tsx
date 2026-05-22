"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Workspace, LoginRequest, RegisterRequest } from '../types/api';
import { authService } from '../lib/services/auth.service';

interface AuthContextData {
  user: User | null;
  token: string | null;
  activeWorkspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  switchWorkspace: (workspaceId: string) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const storedToken = localStorage.getItem('nexus_token');
    const storedUser = localStorage.getItem('nexus_user');
    const storedWorkspaceId = localStorage.getItem('nexus_workspace_id');

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);

        if (storedWorkspaceId && parsedUser.workspaces) {
          const workspace = parsedUser.workspaces.find(w => w.id === storedWorkspaceId);
          if (workspace) {
            setActiveWorkspace(workspace);
          } else if (parsedUser.workspaces.length > 0) {
            // Default to first workspace if the stored one is not found
            setActiveWorkspace(parsedUser.workspaces[0]);
            localStorage.setItem('nexus_workspace_id', parsedUser.workspaces[0].id);
          }
        } else if (parsedUser.workspaces && parsedUser.workspaces.length > 0) {
          setActiveWorkspace(parsedUser.workspaces[0]);
          localStorage.setItem('nexus_workspace_id', parsedUser.workspaces[0].id);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      const { token: newToken, user: loggedUser } = response;

      setToken(newToken);
      setUser(loggedUser);
      localStorage.setItem('nexus_token', newToken);
      localStorage.setItem('nexus_user', JSON.stringify(loggedUser));

      if (loggedUser.workspaces && loggedUser.workspaces.length > 0) {
        setActiveWorkspace(loggedUser.workspaces[0]);
        localStorage.setItem('nexus_workspace_id', loggedUser.workspaces[0].id);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
 
      if (data.password) {
        await login({ email: data.email, password: data.password });
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  function logout() {
    setToken(null);
    setUser(null);
    setActiveWorkspace(null);
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('nexus_workspace_id');
  }

  const switchWorkspace = (workspaceId: string) => {
    if (user && user.workspaces) {
      const workspace = user.workspaces.find(w => w.id === workspaceId);
      if (workspace) {
        setActiveWorkspace(workspace);
        localStorage.setItem('nexus_workspace_id', workspace.id);
      }
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        activeWorkspace,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        switchWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
