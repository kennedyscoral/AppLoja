package br.com.lojaapi.resources;


import br.com.lojaapi.models.Genero;
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
@Path("generos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class GeneroResource {
    
    static List<Genero> generos = new ArrayList<>();
    
    @PersistenceContext(unitName = "LojaPU")
    EntityManager entityManager;
    
    @GET
    public List<Genero> getGeneros() {
        return entityManager
                .createQuery("SELECT g FROM Genero g", Genero.class)
                .getResultList();
    }
    
    @POST
    public Response addGenero(Genero genero) {
        entityManager.persist(genero);
        return Response
                .status(Response.Status.CREATED)
                .entity(genero)
                .build();
    }
    
    @GET
    @Path("{id}")
    public Genero getGenero(@PathParam("id") String id) {
        return entityManager.find(Genero.class, id);
    }
        
    @DELETE
    @Path("{id}")
    public void removeGenero(@PathParam("id") String id) {
        Genero genero = entityManager.find(Genero.class, id);
        entityManager.remove(genero);
    }
    
    @PUT
    @Path("{id}")
    public Genero updateCor(@PathParam("id") String id, Genero a) {
        a.setId(id);
        entityManager.merge(a);
        return a;
    }
}
