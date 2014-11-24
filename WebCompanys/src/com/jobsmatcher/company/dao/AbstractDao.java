package com.jobsmatcher.company.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.criterion.Criterion;

public interface AbstractDao<E, I extends Serializable> {
	 public E findById(I id);
	 public  List<E>  findAll();
	 public E findByName(String name);
	 public void saveOrUpdate(E e);
	 public void delete(E e);
	 public List<E>  findByCriteria(Criterion criterion);
}

