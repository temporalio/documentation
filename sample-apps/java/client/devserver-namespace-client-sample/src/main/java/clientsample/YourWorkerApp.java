package clientsample;

import java.io.BufferedOutputStream;
import java.io.PrintStream;

public class YourWorkerApp {
    public static void main(String[] args) {
        // A Worker can start, Signal, and Query a Workflow Execution, etc
        YourWorker.initiateWorker(args);
    }
}
