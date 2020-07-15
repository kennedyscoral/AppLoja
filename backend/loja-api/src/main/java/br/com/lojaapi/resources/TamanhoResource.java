package br.com.lojaapi.resources;


import br.com.lojaapi.models.Tamanho;
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
@Path("tamanhos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TamanhoResource {
    
    static List<Tamanho> tamanhos = new ArrayList<>();
    
    @PersistenceContext(unitName = "LojaPU")
    EntityManager entityManager;
    
    @GET
    public List<Tamanho> getTamanho() {
        return entityManager
                .createQuery("SELECT t FROM Tamanho t", Tamanho.class)
                .getResultList();
    }
    
    @POST
    public Response addTamanho(Tamanho tamanho) {
        entityManager.persist(tamanho);
        return Response
                .status(Response.Status.CREATED)
                .entity(tamanho)
                .build();
    }
    
    @GET
    @Path("{id}")
    public Tamanho getTamanho(@PathParam("id") String id) {
        return entityManager.find(Tamanho.class, id);
    }
        
    @DELETE
    @Path("{id}")
    public void removeTamanho(@PathParam("id") String id) {
        Tamanho tamanho = entityManager.find(Tamanho.class, id);
        entityManager.remove(tamanho);
    }
    
    @PUT
    @Path("{id}")
    public Tamanho updateTamanho(@PathParam("id") String id, Tamanho a) {
        a.setId(id);
        entityManager.merge(a);
        return a;
    }
}
