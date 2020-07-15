package br.com.lojaapi.resources;


import br.com.lojaapi.models.Roupa;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Usuario
 */
@Stateless
@Path("roupas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RoupaResource {
    
    @PersistenceContext(unitName = "LojaPU")
    EntityManager entityManager;
    
    @GET
    public List<Roupa> getRoupas(@QueryParam("nome") String nome) {
        if (nome == null || nome.isEmpty()) {
            return entityManager
                    .createNamedQuery("Roupa.findAll", Roupa.class)
                    .getResultList();
        } else {
            return entityManager
                    .createNamedQuery("Roupa.findByNome")
                    .setParameter("nome", nome)
                    .getResultList();
        }
    }
    
    @POST
    public Roupa addRoupa(Roupa roupa) {
        entityManager.persist(roupa);
        return roupa;
    }

    @GET
    @Path("{id}")
    public Roupa getRoupa(@PathParam("id") String id) {
        return entityManager.find(Roupa.class, id);
    }

    @DELETE
    @Path("{id}")
    public void removeRoupa(@PathParam("id") String id) {
        Roupa roupaEncontrada = entityManager.find(Roupa.class, id);
        entityManager.remove(roupaEncontrada);
    }

    @PUT
    @Path("{id}")
    public Roupa updateLivro(@PathParam("id") String id, Roupa roupa) {
        roupa.setId(id);
        entityManager.merge(roupa);
        return roupa;
    }
}
