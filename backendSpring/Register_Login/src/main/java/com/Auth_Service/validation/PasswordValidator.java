package com.Auth_Service.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidatorImpl.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordValidator {
    String message() default "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}