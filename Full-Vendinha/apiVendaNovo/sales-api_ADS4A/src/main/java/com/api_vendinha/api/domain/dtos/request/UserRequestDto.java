package com.api_vendinha.api.domain.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para representar os dados necessários para criar ou atualizar um usuário.
 */
@Data
@NoArgsConstructor
public class UserRequestDto {

    private String name;
    private String email;
    private String password;
    private String cpf;
    private String cnpj;
    private Boolean active;

    private List<ProdutoRequestDto> produtoRequestDtos;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<ProdutoRequestDto> getProdutoRequestDtos() {
        return produtoRequestDtos;
    }

    public void setProdutoRequestDtos(List<ProdutoRequestDto> produtoRequestDtos) {
        this.produtoRequestDtos = produtoRequestDtos;
    }
}
