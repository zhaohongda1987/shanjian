package com.shanjian.test.dao;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.shanjian.dao.WormMapDao;
import com.shanjian.test.BaseTest;

public class WormMapDaoTest extends BaseTest{

	@Autowired
	private WormMapDao wormMapDao;
	
	@Test
	public void testWormMap() throws Exception {
		wormMapDao.query();
	}
}
