package com.cdac.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.entites.MenuItem;
import com.cdac.repository.MenuItemRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Override
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MenuItem not found with ID: " + id));
    }

    @Override
    public MenuItem updateMenuItem(Long id, MenuItem updated) {
        MenuItem existing = getMenuItemById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setAvailable(updated.isAvailable());
        existing.setCategory(updated.getCategory());
        return menuItemRepository.save(existing);
    }

    @Override
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
