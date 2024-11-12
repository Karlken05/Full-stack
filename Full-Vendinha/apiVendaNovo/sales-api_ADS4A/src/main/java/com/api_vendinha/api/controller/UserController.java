package com.api_vendinha.api.controller;

import com.api_vendinha.api.domain.dtos.request.UserRequestDto;
import com.api_vendinha.api.domain.dtos.response.UserResponseDto;
import com.api_vendinha.api.domain.entities.User;
import com.api_vendinha.api.domain.service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceInterface userService;

    @Autowired
    public UserController(UserServiceInterface userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public UserResponseDto salvar(@RequestBody UserRequestDto userRequestDto) {
        return userService.save(userRequestDto);
    }

    @PutMapping("/update/{id}")
    public UserResponseDto update(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
        return userService.update(userRequestDto, id);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable Long id) {
        userService.deletar(id);
    }

    @GetMapping("/findAll")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/findById/{id}")
    public User findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/ativar/{id}")
    public UserResponseDto ativar(@PathVariable Long id) {
        return userService.ativar(id);
    }

    @PutMapping("/desativar/{id}")
    public UserResponseDto desativar(@PathVariable Long id) {
        return userService.desativar(id);
    }
}

