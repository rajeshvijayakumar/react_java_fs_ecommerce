package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ContactRequestDto;

import java.util.List;

public interface IContactService {

   boolean saveContact(ContactRequestDto contactRequestDto);
}
