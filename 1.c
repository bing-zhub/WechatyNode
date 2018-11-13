#include <stdio.h>
#include <string.h>
#include <jansson.h>

int main(){
	char *s_repon = NULL;
	json_t *data = json_object;
	json_t *sensor_data= json_object;
	json_t *device = json_object;
	
	json_t *type = json_object;
	json_t *id = json_object;

	json_object_set_new(sensor_data, "temp", 28);
	json_object_set_new(sensor_data, "humo", 78);
	json_object_set_new(sensor_data, "ir", 1);

	json_object_set_new(device, "id", 1);
	json_object_set_new(device, "type", 0);

	json_object_set_new(data, "device", device);
	json_object_set_new(data, "sensor", sensor_data);

	s_repon = json_dumps(data, JSON_INDENT(0));

	printf("%s", s_repon);
	return 0;
}
