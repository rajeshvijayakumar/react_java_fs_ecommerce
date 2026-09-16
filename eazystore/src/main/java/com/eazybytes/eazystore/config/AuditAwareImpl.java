package com.eazybytes.eazystore.config;

import com.eazybytes.eazystore.entity.Customer;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {

            return Optional.of("Anonymous user");
        }

        Object principal = authentication.getPrincipal();
        String userName;

        if(principal instanceof Customer customer){
            userName = customer.getEmail();
        } else {
            userName = principal.toString(); // fallback mechanism
        }

        return Optional.of(userName);
    }
}
