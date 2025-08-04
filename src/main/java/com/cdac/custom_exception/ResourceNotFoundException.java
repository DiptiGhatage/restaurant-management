package com.cdac.custom_exception;


public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String errMesg) {
        super(errMesg);
    }
    public ResourceNotFoundException(String resourceName, String fieldName, Long fieldValue) {
        super(String.format("%s not found with %s : %d", resourceName, fieldName, fieldValue));
    }

}
