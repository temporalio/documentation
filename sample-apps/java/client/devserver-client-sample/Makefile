.PHONY: build clean worker caller help

help:
	 @echo "Usage: make [target]"
	 @echo "  make build  : Build this project using Maven (mvn clean install)"
	 @echo "  make clean  : Clean this project using Maven (mvn clean)"
	 @echo "  make worker : Run the TimeWorkerApp using Maven."
	 @echo "                The app blocks until you interrupt it."
	 @echo "  make caller : Run the TimeCallerApp using Maven"
	 @echo "                The app blocks until it completes."

build:
	 @mvn clean install -Dmaven.logging.level=0

clean:
	 @mvn clean -q -Dmaven.logging.level=0

worker:
	 @mvn compile exec:java -Dexec.mainClass="timefetch.TimeWorkerApp" -Dmaven.logging.level=1

caller:
	 @mvn exec:java -Dexec.mainClass="timefetch.TimeCallerApp" -q -Dmaven.logging.level=1
