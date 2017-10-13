package com.shanjian.service;

import com.shanjian.request.LocationRequest;

public interface WormMapService {

	public void getWormMap();
	
	public boolean insertLocation(LocationRequest locationRequest);
}
