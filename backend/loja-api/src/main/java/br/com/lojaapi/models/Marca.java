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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name = "marca", schema = "public")
public class Marca implements Serializable {

    @Id @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String Id;
    
    @Column(nullable = false)
    private String nome;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "marca", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Roupa> roupas = new ArrayList<>();

    public Marca() {
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
