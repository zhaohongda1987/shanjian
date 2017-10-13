package com.shanjian.web;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shanjian.request.LocationRequest;
import com.shanjian.service.WormMapService;

@Controller
public class WormMapController {
	
	private static Logger LOG = LoggerFactory.getLogger(WormMapController.class);
	@Autowired
	private WormMapService wormMapService;

	@RequestMapping(value = "/wormmap", method = RequestMethod.GET)
	private ModelAndView getWormMapMain() {
		ModelAndView mv = new ModelAndView("wormmap");
		wormMapService.getWormMap();
		LOG.error("test");
		return mv;
	}
	
	@RequestMapping(value = "/editNodeAdjax", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Object getMaskCanvasAjax(@RequestBody LocationRequest request) {
		JSONObject response = new JSONObject();
		try {
			response.put("myData",wormMapService.insertLocation(request));
			response.put("status", true);
		} catch (Exception e) {
			LOG.error("editNodeAjax:", e);
			response.put("status", false);
		}
		return response.toString();
	}
}
