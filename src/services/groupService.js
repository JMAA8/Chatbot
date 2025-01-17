import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/user'; // Basis-URL für Gruppen-Endpoints

// Alle Gruppen abrufen
export const getAllGroups = async () => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data; // Liste der Gruppen
    } catch (error) {
        throw error.response?.data || 'Fehler beim Abrufen der Gruppen.';
    }
};

// Gruppe erstellen
export const createGroup = async (groupName) => {
    try {
        const response = await axios.post(
            API_BASE_URL,
            { groupName },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        return response.data; // Erfolgsnachricht
    } catch (error) {
        throw error.response?.data || 'Fehler beim Erstellen der Gruppe.';
    }
};

// Benutzer zu Gruppe hinzufügen
export const addUserToGroup = async (groupId, userId) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${groupId}/add-user/${userId}`,
            {},
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        return response.data; // Erfolgsnachricht
    } catch (error) {
        throw error.response?.data || 'Fehler beim Hinzufügen des Benutzers zur Gruppe.';
    }
};

// Benutzer aus Gruppe entfernen
export const removeUserFromGroup = async (groupId, userId) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${groupId}/remove-user/${userId}`,
            {},
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        return response.data; // Erfolgsnachricht
    } catch (error) {
        throw error.response?.data || 'Fehler beim Entfernen des Benutzers aus der Gruppe.';
    }
};

// Gruppe löschen
export const deleteGroup = async (groupId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${groupId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data; // Erfolgsnachricht
    } catch (error) {
        throw error.response?.data || 'Fehler beim Löschen der Gruppe.';
    }
};

// Gruppen, denen der Benutzer angehört (Basic_User spezifisch)
export const getJoinedGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/joined`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data; // Liste der Gruppen, denen der Benutzer angehört
    } catch (error) {
        throw error.response?.data || 'Fehler beim Abrufen der beigetretenen Gruppen.';
    }
};

export default {
    getAllGroups,
    createGroup,
    addUserToGroup,
    removeUserFromGroup,
    deleteGroup,
    getJoinedGroups,
};
