import { Clan, ClanMember, ClanActivity, ClanEvent, MembershipRequest } from '../types/clan';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Базовая функция для запросов с авторизацией
const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> => {
  try {
    const token = localStorage.getItem('token');
    
    const headers = {
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    return { 
      success: false, 
      message: 'Произошла ошибка при выполнении запроса' 
    };
  }
};

// Получение списка кланов с фильтрацией и пагинацией
export const getClans = async (
  page = 1,
  limit = 10,
  search?: string,
  types?: string[],
  tags?: string[]
): Promise<APIResponse<{ clans: Clan[]; total: number; pages: number }>> => {
  let url = `/api/clans?page=${page}&limit=${limit}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (types && types.length > 0) {
    url += `&types=${types.join(',')}`;
  }
  
  if (tags && tags.length > 0) {
    url += `&tags=${tags.join(',')}`;
  }
  
  return fetchWithAuth(url);
};

// Получение данных о клане по ID
export const getClan = async (id: string): Promise<APIResponse<Clan>> => {
  return fetchWithAuth(`/api/clans/${id}`);
};

// Создание нового клана
export const createClan = async (formData: FormData): Promise<APIResponse<Clan>> => {
  return fetchWithAuth('/api/clans', {
    method: 'POST',
    body: formData,
  });
};

// Обновление данных клана
export const updateClan = async (
  id: string,
  formData: FormData
): Promise<APIResponse<Clan>> => {
  return fetchWithAuth(`/api/clans/${id}`, {
    method: 'PUT',
    body: formData,
  });
};

// Удаление клана
export const deleteClan = async (id: string): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${id}`, {
    method: 'DELETE',
  });
};

// Присоединение к клану
export const joinClan = async (id: string): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${id}/join`, {
    method: 'POST',
  });
};

// Выход из клана
export const leaveClan = async (id: string): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${id}/leave`, {
    method: 'DELETE',
  });
};

// Обработка заявки на вступление
export const processMembershipRequest = async (
  clanId: string,
  requestId: string,
  approve: boolean
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/requests/${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ approved: approve }),
  });
};

// Управление участниками
export const promoteMember = async (
  clanId: string,
  memberId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/members/${memberId}/promote`, {
    method: 'PUT',
  });
};

export const demoteMember = async (
  clanId: string,
  memberId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/members/${memberId}/demote`, {
    method: 'PUT',
  });
};

export const kickMember = async (
  clanId: string,
  memberId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/members/${memberId}`, {
    method: 'DELETE',
  });
};

export const transferLeadership = async (
  clanId: string,
  newLeaderId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/transfer-leadership`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newLeaderId }),
  });
};

// Работа с активностью клана
export const addClanPost = async (
  clanId: string,
  formData: FormData
): Promise<APIResponse<ClanActivity>> => {
  return fetchWithAuth(`/api/clans/${clanId}/posts`, {
    method: 'POST',
    body: formData,
  });
};

export const addClanComment = async (
  clanId: string,
  activityId: string,
  content: string
): Promise<APIResponse<ClanActivity>> => {
  return fetchWithAuth(`/api/clans/${clanId}/activities/${activityId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
};

// Работа с мероприятиями клана
export const getClanEvents = async (clanId: string): Promise<APIResponse<ClanEvent[]>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events`);
};

export const getClanEvent = async (
  clanId: string, 
  eventId: string
): Promise<APIResponse<ClanEvent>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events/${eventId}`);
};

export const createClanEvent = async (
  clanId: string,
  formData: FormData
): Promise<APIResponse<ClanEvent>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events`, {
    method: 'POST',
    body: formData,
  });
};

export const updateClanEvent = async (
  clanId: string,
  eventId: string,
  formData: FormData
): Promise<APIResponse<ClanEvent>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events/${eventId}`, {
    method: 'PUT',
    body: formData,
  });
};

export const deleteClanEvent = async (
  clanId: string,
  eventId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events/${eventId}`, {
    method: 'DELETE',
  });
};

export const joinClanEvent = async (
  clanId: string,
  eventId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events/${eventId}/join`, {
    method: 'POST',
  });
};

export const leaveClanEvent = async (
  clanId: string,
  eventId: string
): Promise<APIResponse<void>> => {
  return fetchWithAuth(`/api/clans/${clanId}/events/${eventId}/leave`, {
    method: 'DELETE',
  });
}; 