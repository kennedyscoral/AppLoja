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
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name = "cor", schema = "public")
public class Cor implements Serializable {

    @Id @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String Id;
    
    @Column(nullable = false)
    private String nome;
    
    @ManyToMany(mappedBy = "cores")
    @JsonIgnore
    private List<Roupa> roupas = new ArrayList<>();

    public Cor() {
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

    public List<Roupa> getRoupas() {
        return roupas;
    }

    public void setRoupas(List<Roupa> roupas) {
        this.roupas = roupas;
    }
}
