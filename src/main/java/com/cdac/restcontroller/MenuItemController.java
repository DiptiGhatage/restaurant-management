package com.cdac.restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entites.MenuItem;
import com.cdac.service.MenuItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;
    // Admin only - Create
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.createMenuItem(menuItem));
    }
    
    // Anyone with USER or ADMIN role can view menu by id
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }
    
    // Anyone with USER or ADMIN role can view menu by id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }
    
    // Admin only - Update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, menuItem));
    }
    
    //Admin only - Delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
