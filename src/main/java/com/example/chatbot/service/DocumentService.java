package com.example.chatbot.service;

import com.example.chatbot.entity.Document;
import com.example.chatbot.repository.DocumentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class DocumentService {

    @Inject
    DocumentRepository documentRepository;

    public void saveDocument(Document document) {
        documentRepository.persist(document);
    }

    public List<Document> getDocumentsByUserId(String userId) {
        return documentRepository.find("userId", userId).list();
    }
}