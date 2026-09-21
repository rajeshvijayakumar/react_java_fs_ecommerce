package com.eazybytes.eazystore;

import com.eazybytes.eazystore.config.AuditAwareImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class EazystoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(EazystoreApplication.class, args);
	}

}
