package br.com.lojaapi.resources;


import br.com.lojaapi.models.Cor;
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
@Path("cores")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CorResource {
    
    static List<Cor> cores = new ArrayList<>();
    
    @PersistenceContext(unitName = "LojaPU")
    EntityManager entityManager;
    
    @GET
    public List<Cor> getCores() {
        return entityManager
                .createQuery("SELECT c FROM Cor c", Cor.class)
                .getResultList();
    }
    
    @POST
    public Response addCor(Cor cor) {
        entityManager.persist(cor);
        return Response
                .status(Response.Status.CREATED)
                .entity(cor)
                .build();
    }
    
    @GET
    @Path("{id}")
    public Cor getCor(@PathParam("id") String id) {
        return entityManager.find(Cor.class, id);
    }
        
    @DELETE
    @Path("{id}")
    public void removeCor(@PathParam("id") String id) {
        Cor cor = entityManager.find(Cor.class, id);
        entityManager.remove(cor);
    }
    
    @PUT
    @Path("{id}")
    public Cor updateCor(@PathParam("id") String id, Cor a) {
        a.setId(id);
        entityManager.merge(a);
        return a;
    }
}
