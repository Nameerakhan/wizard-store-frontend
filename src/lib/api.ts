/**
 * API utilities for connecting to Python backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface ChatRequest {
  query: string;
  top_k?: number;
  verbose?: boolean;
}

export interface ChatResponse {
  answer: string;
  context?: any[];
  intent?: string;
  error?: string;
}

/**
 * Send a chat query to the backend
 */
export async function sendChatQuery(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat query:', error);
    throw error;
  }
}

/**
 * Health check for backend API
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

// ── Guest Order types ─────────────────────────────────────────────────────────

export interface GuestOrderPayload {
  customer_name: string;
  customer_email: string;
  shipping_address: {
    full_name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: { product_name: string; product_price: number; quantity: number }[];
}

export async function placeGuestOrder(payload: GuestOrderPayload): Promise<{ order_id: string; status: string; total: number }> {
  const response = await fetch(`${API_BASE_URL}/orders/guest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `Order failed (${response.status})`);
  }
  return response.json();
}

export async function getGuestOrder(orderId: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/orders/guest/${orderId}`);
  if (!response.ok) throw new Error(`Order not found (${response.status})`);
  return response.json();
}

/**
 * Get product recommendations
 */
export async function getProductRecommendations(query: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch {
    return [];
  }
}
