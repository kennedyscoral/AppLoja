package br.com.lojaapi.resources;


import br.com.lojaapi.models.Marca;
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
@Path("marcas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MarcaResource {
    
    static List<Marca> marcas = new ArrayList<>();
    
    @PersistenceContext(unitName = "LojaPU")
    EntityManager entityManager;
    
    @GET
    public List<Marca> getMarcas() {
        return entityManager
                .createQuery("SELECT m FROM Marca m", Marca.class)
                .getResultList();
    }
    
    @POST
    public Response addMarca(Marca marca) {
        entityManager.persist(marca);
        return Response
                .status(Response.Status.CREATED)
                .entity(marca)
                .build();
    }
    
    @GET
    @Path("{id}")
    public Marca getMarca(@PathParam("id") String id) {
        return entityManager.find(Marca.class, id);
    }
        
    @DELETE
    @Path("{id}")
    public void removeMarca(@PathParam("id") String id) {
        Marca marca = entityManager.find(Marca.class, id);
        entityManager.remove(marca);
    }
    
    @PUT
    @Path("{id}")
    public Marca updateMarca(@PathParam("id") String id, Marca a) {
        a.setId(id);
        entityManager.merge(a);
        return a;
    }
}
