package com.api_vendinha.api.domain.service;

import com.api_vendinha.api.Infrastructure.repository.ProdutoRepository;
import com.api_vendinha.api.domain.dtos.request.ProdutoRequestDto;
import com.api_vendinha.api.domain.dtos.response.ProdutoResponseDto;
import com.api_vendinha.api.domain.entities.Produto;
import com.api_vendinha.api.domain.entities.User;
import com.api_vendinha.api.domain.service.ProdutoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoServiceImpl(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    @Override
    public ProdutoResponseDto save(ProdutoRequestDto produtoRequestDto) {
        Optional<Produto> produtoExite = produtoRepository.findByName(produtoRequestDto.getName());

        if(produtoExite.isPresent()){
            throw new IllegalArgumentException("Já existe um cadastro deste produto");
        }

        Produto prod = new Produto();
        prod.setName(produtoRequestDto.getName());
        prod.setQuantidade(produtoRequestDto.getQuantidade());
        prod.setPreco(produtoRequestDto.getPreco());

        Produto saveproduct = produtoRepository.save(prod);

        ProdutoResponseDto prodRes = new ProdutoResponseDto();
        prodRes.setName(saveproduct.getName());
        prodRes.setQuantidade(saveproduct.getQuantidade());
        prodRes.setPreco(saveproduct.getPreco());
        prodRes.setActive(saveproduct.getActive());

        return prodRes;
    }

    @Override
    public ProdutoResponseDto update(ProdutoRequestDto produtoRequestDto, Long id) {
        Produto prodExist = produtoRepository.findById(id).orElseThrow();

        prodExist.setName(produtoRequestDto.getName());
        prodExist.setQuantidade(produtoRequestDto.getQuantidade());
        prodExist.setPreco(produtoRequestDto.getPreco());

        Produto saveproduct = produtoRepository.save(prodExist);


        ProdutoResponseDto prodRes = new ProdutoResponseDto();
        prodRes.setName(saveproduct.getName());
        prodRes.setQuantidade(saveproduct.getQuantidade());
        prodRes.setPreco(saveproduct.getPreco());
        prodRes.setActive(saveproduct.getActive());

        return prodRes;
    }

    @Override
    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    @Override
    public Produto findById(Long id) {
        return produtoRepository.findById(id).orElseThrow();
    }

    @Override
    public void deletar(Long id) {
        Produto prodExist = produtoRepository.findById(id).orElseThrow();
        produtoRepository.delete(prodExist);
    }
}
