package com.api_vendinha.api.domain.service;

import com.api_vendinha.api.domain.dtos.request.ProdutoRequestDto;
import com.api_vendinha.api.domain.dtos.response.ProdutoResponseDto;
import com.api_vendinha.api.domain.entities.Produto;

import java.util.List;

public interface ProdutoService {
    // ProdutoResponseDto save(ProdutoRequestDto produtoRequestDto);
    ProdutoResponseDto update(ProdutoRequestDto produtoRequestDto, Long id);
    ProdutoResponseDto save(ProdutoRequestDto produtoRequestDto);
    List<Produto> findAll();
    Produto findById(Long id);
    void deletar(Long id);


}
