package com.cognizant.elearning.authenticationservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AuthenticationserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationserviceApplication.class, args);
	}
	@Bean
ModelMapper mapper() {
	return new ModelMapper();
}
}
