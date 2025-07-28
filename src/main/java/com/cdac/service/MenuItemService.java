package com.cdac.service;

import java.util.List;

import com.cdac.entites.MenuItem;

public interface MenuItemService {
    MenuItem createMenuItem(MenuItem menuItem);
    List<MenuItem> getAllMenuItems();
    MenuItem getMenuItemById(Long id);
    MenuItem updateMenuItem(Long id, MenuItem menuItem);
    void deleteMenuItem(Long id);
}
