package com.example.swp.services.sendmails;
import com.example.swp.dtos.DataMailDTO;
import jakarta.mail.MessagingException;



public interface IMailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
