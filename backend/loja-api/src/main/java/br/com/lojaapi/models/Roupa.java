/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.lojaapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name = "roupa", schema = "public")
@NamedQueries({
    @NamedQuery(name = "Roupa.findAll", query = "SELECT r FROM Roupa r"),
    @NamedQuery(name = "Roupa.findByTitulo", query = "SELECT r FROM Roupa r where r.nome LIKE :nome")
})
public class Roupa implements Serializable {

    @Id @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String Id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String imagem;
    
    @ManyToOne
    private Marca marca;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)    
    @JoinTable(
            name = "roupa_tamanho", schema = "public",
            joinColumns = { @JoinColumn(name = "roupa_id")},
            inverseJoinColumns = { @JoinColumn(name = "tamanho_id")} 
    )
    private List<Tamanho> tamanhos = new ArrayList<>();
    
    @ManyToOne
    private Genero genero;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)    
    @JoinTable(
            name = "roupa_cor", schema = "public",
            joinColumns = { @JoinColumn(name = "roupa_id")},
            inverseJoinColumns = { @JoinColumn(name = "cor_id")} 
    )
    private List<Cor> cores = new ArrayList<>();
    
    @Column(nullable = false)
    private Float preco;
    
    @Column(nullable = false)
    private Integer estoque;
    
    @Column(nullable = false)
    private Integer reservado;
    
    @Column(nullable = false)
    private Integer estoque_minimo;
    
    @Column(nullable = false)
    private Integer qt_venda_desconto;
    
    @Column(nullable = false)
    private Integer qt_venda;

    public Roupa() {        
    }    

    public String getId() {
        return Id;
    }

    public void setId(String Id) {
        this.Id = Id;
    }    

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public List<Tamanho> getTamanhos() {
        return tamanhos;
    }

    public void setTamanhos(List<Tamanho> tamanhos) {
        this.tamanhos = tamanhos;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public List<Cor> getCores() {
        return cores;
    }

    public void setCores(List<Cor> cores) {
        this.cores = cores;
    }

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public Integer getReservado() {
        return reservado;
    }

    public void setReservado(Integer reservado) {
        this.reservado = reservado;
    }

    public Integer getEstoque_minimo() {
        return estoque_minimo;
    }

    public void setEstoque_minimo(Integer estoque_minimo) {
        this.estoque_minimo = estoque_minimo;
    }    

    public Integer getQt_venda_desconto() {
        return qt_venda_desconto;
    }

    public void setQt_venda_desconto(Integer qt_venda_desconto) {
        this.qt_venda_desconto = qt_venda_desconto;
    }

    public Integer getQt_venda() {
        return qt_venda;
    }

    public void setQt_venda(Integer qt_venda) {
        this.qt_venda = qt_venda;
    }    
}
