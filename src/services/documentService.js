import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const API_BASE_URL = 'http://localhost:8080/api/documents';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token nicht gefunden. Bitte melden Sie sich erneut an.');
    }
    const decoded = jwtDecode(token);
    return decoded.userId; // Angenommen, die Benutzer-ID ist als `userId` im Token enthalten
};

//Benutzer-Dokumente abrufen
export const getUserDocuments = async () => {
    const userId = getUserIdFromToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Dokumente:', error);
        throw error.response?.data || 'Fehler beim Abrufen der Dokumente.';
    }
};

// Neues Dokument hochladen
export const uploadDocument = async (file) => {
    const userId = getUserIdFromToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
        await axios.post(API_BASE_URL, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Fehler beim Hochladen des Dokuments:', error);
        throw error.response?.data || 'Fehler beim Hochladen des Dokuments.';
    }
};

//Dokument nach Namen suchen
export const searchDocuments = async (userId, query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}?search=${query}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Fehler bei der Dokumentensuche:', error);
        throw error.response?.data || 'Fehler bei der Suche nach Dokumenten.';
    }
};

export default {
    getUserDocuments,
    uploadDocument,
    searchDocuments,
};
