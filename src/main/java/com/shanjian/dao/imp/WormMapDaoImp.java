package com.shanjian.dao.imp;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.shanjian.dao.WormMapDao;

public class WormMapDaoImp extends JdbcDaoSupport implements WormMapDao {

	@Override
	public void query() {
		String sql = "select * from shanjian.worm_map_tmp";
		
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql);
		
		for (Map<String, Object> row : list) {
			
		}
	}

}
